package com.vapttracker.service;

import com.vapttracker.dto.SecondaryOwnerReportDTO;
import com.vapttracker.entity.AuditLog;
import com.vapttracker.entity.User;
import com.vapttracker.entity.VaptTicket;
import com.vapttracker.entity.Vendor;
import com.vapttracker.repository.AuditLogRepository;
import com.vapttracker.repository.UserRepository;
import com.vapttracker.repository.VaptTicketRepository;
import com.vapttracker.repository.VendorRepository;
import com.vapttracker.security.CustomUserDetails;
import com.vapttracker.util.SecurityUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VaptTicketService {
    @Autowired
    VaptTicketRepository ticketRepository;
    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuditLogRepository auditLogRepository;

    @Autowired
    AuditService auditService;
    public VaptTicket createTicket(
            String ticketLink,
            String status,
            Long vendorId,
            String primaryOwner,
            String secondaryOwner
    ) throws IOException {
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow();
        CustomUserDetails currentUser =
                SecurityUtil.getCurrentUser();
        User user = userRepository.findByEmail(currentUser.getUsername()).get();
        VaptTicket ticket = new VaptTicket();
        ticket.setTicketLink(ticketLink);
        ticket.setStatus(status);
        ticket.setPrimaryOwner(primaryOwner);
        ticket.setSecondaryOwner(secondaryOwner);
        ticket.setVendor(vendor);
        ticket.setTicketCreatedBy(SecurityUtil.getCurrentUserEmail());
        ticket.setCreatedBy(
                user
        );
        ticketRepository.save(ticket);
        auditService.log(
                ticket.getId(),
                status
        );

        return ticket;
    }

    public VaptTicket updateTicket(
            Long ticketId, String ticketLink, String status, Long vendorId,
            String primaryOwner, String secondaryOwner, MultipartFile file, String uploadDir
    ) throws IOException {

        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow();
        VaptTicket vaptTicket =
                ticketRepository.findById(ticketId)
                        .orElseThrow();
        File savedFile = null;
        System.out.println(vendor.getVendorName());
        File directory =
                new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }
        if(file != null && !file.isEmpty()) {
            directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            String fileName = ticketId + "_" + file.getOriginalFilename();
            savedFile = new File(uploadDir + File.separator + fileName);
            file.transferTo(savedFile);
            vaptTicket.setReportPath(savedFile.getAbsolutePath());
        }
        vaptTicket.setStatus(status);
        vaptTicket.setPrimaryOwner(primaryOwner);
        vaptTicket.setSecondaryOwner(secondaryOwner);
        vaptTicket.setVendor(vendor);
        vaptTicket.setAuditLogList(auditLogRepository.findByTicketIdOrderByCreatedAtDesc(ticketId));
        ticketRepository.save(vaptTicket);
        auditService.log(
                vaptTicket.getId(),
                status
        );
        return vaptTicket;
    }

    public Page<VaptTicket> getAllTickets(int page, int size, String status,
                                          Long vendorId, String primaryOwner,
                                          String secondaryOwner,String search){
        Pageable pageable =
                PageRequest.of(page, size);
        Specification<VaptTicket> spec =
                Specification.where(null);
        /* STATUS FILTER */
        if (status != null &&
                !status.isEmpty()) {
            spec = spec.and(
                    (root, query, cb) ->
                            cb.equal(
                                    root.get("status"),
                                    status
                            )
            );
        }
        /* VENDOR FILTER */
        if (vendorId != null) {
            spec = spec.and(
                    (root, query, cb) ->
                            cb.equal(
                                    root.get("vendor")
                                            .get("id"),
                                    vendorId
                            )
            );
        }
        /* PRIMARY OWNER FILTER */
        if (primaryOwner != null) {
            spec = spec.and(
                    (root, query, cb) ->
                            cb.equal(
                                    root.get("primaryOwner"),
                                    primaryOwner
                            )
            );
        }
        /* SEC OWNER FILTER */
        if (secondaryOwner != null) {
            spec = spec.and(
                    (root, query, cb) ->
                            cb.equal(
                                    root.get("secondaryOwner"),
                                    secondaryOwner
                            )
            );
        }
        /* SEARCH FILTER */
        if (search != null &&
                !search.isEmpty()) {
            spec = spec.and(
                    (root, query, cb) ->
                            cb.like(
                                    cb.lower(
                                            root.get(
                                                    "ticketCreatedBy"
                                            )
                                    ),
                                    "%" +
                                            search.toLowerCase() +
                                            "%"
                            )
            );
        }
        return ticketRepository.findAll(
                spec,
                pageable
        );
    }

    public VaptTicket getTicket(Long id) {
        List<AuditLog> auditLogs = auditLogRepository
                .findByTicketIdOrderByCreatedAtDesc(
                        id
                );
        Optional<VaptTicket> vaptTicket = ticketRepository.findById(id);
        if(vaptTicket.isPresent()) {
            vaptTicket.get().setAuditLogList(auditLogRepository.findByTicketIdOrderByCreatedAtDesc(id));
            return vaptTicket.get();
        }else
            return new VaptTicket();
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
        auditService.log(
                id,
                "deleted"
        );
    }

    public void bulkUpload(
            MultipartFile file
    ) throws Exception {

        Workbook workbook = new XSSFWorkbook(
                        file.getInputStream());
        CustomUserDetails currentUser = SecurityUtil.getCurrentUser();
        User user = userRepository.findByEmail(currentUser.getUsername()).get();
        Sheet sheet =
                workbook.getSheetAt(0);

        List<VaptTicket> tickets =
                new ArrayList<>();
        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }
            VaptTicket ticket = new VaptTicket();
            ticket.setTicketLink( row.getCell(0).getStringCellValue());
            ticket.setTicketCreatedBy(row.getCell(1).getStringCellValue());
            ticket.setStatus(row.getCell(2).getStringCellValue());
            ticket.setPrimaryOwner(row.getCell(3).getStringCellValue());
            ticket.setSecondaryOwner(row.getCell(4).getStringCellValue());
            Vendor vendor = vendorRepository.findByVendorName(row.getCell(5).getStringCellValue()).orElseThrow();
            ticket.setVendor(vendor);
            ticket.setCreatedBy(user);
            tickets.add(ticket);
        }
        ticketRepository.saveAll(
                tickets
        );
        workbook.close();
    }

}
