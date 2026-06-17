package com.vapttracker.controller;
import com.vapttracker.dto.SecondaryOwnerReportDTO;
import com.vapttracker.entity.AuditLog;
import com.vapttracker.entity.VaptTicket;
import com.vapttracker.service.VaptTicketService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class VaptTicketController {

    @Autowired
    VaptTicketService vaptTicketService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping
    public VaptTicket createTicket(
            @RequestParam String ticketLink,
            @RequestParam String status,
            @RequestParam Long vendorId,
            @RequestParam String primaryOwner,
            @RequestParam String secondaryOwner,
            @RequestParam String ticketCreatedBy
    ) throws IOException {
        return vaptTicketService.createTicket(ticketLink, status, vendorId, primaryOwner, secondaryOwner);
    }

    @PostMapping(value = "/update/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public VaptTicket updateTicket(
            @PathVariable Long id,
            @RequestParam String ticketLink,
            @RequestParam String status,
            @RequestParam Long vendorId,
            @RequestParam String primaryOwner,
            @RequestParam String secondaryOwner,
            @RequestPart(required = false) MultipartFile file
    ) throws IOException {
        return vaptTicketService.updateTicket(id, ticketLink, status, vendorId, primaryOwner, secondaryOwner, file, uploadDir);
    }

    @GetMapping
    public Page<VaptTicket> getTickets(
            @RequestParam(defaultValue = "0")
            int page,
            @RequestParam(defaultValue = "10")
            int size,
            @RequestParam(required = false)
            String status,
            @RequestParam(required = false)
            Long vendorId,
            @RequestParam(required = false)
            String primaryOwner,
            @RequestParam(required = false)
            String secondaryOwner,
            @RequestParam(required = false)
            String search
    ) {
        return vaptTicketService.getAllTickets(page, size, status, vendorId, primaryOwner, secondaryOwner, search);
    }
    @GetMapping("/{id}")
    public VaptTicket getTicket(Long id) {
        return vaptTicketService.getTicket(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        vaptTicketService.deleteTicket(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

    @PostMapping(
            "/bulk-upload"
    )
    public ResponseEntity<String> bulkUpload(@RequestParam("file")  MultipartFile file) {
        try {
            vaptTicketService
                    .bulkUpload(file);

            return ResponseEntity.ok(
                    "Upload Successful"
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

}