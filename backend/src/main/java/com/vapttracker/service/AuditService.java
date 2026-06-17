package com.vapttracker.service;

import com.vapttracker.entity.AuditLog;
import com.vapttracker.entity.VaptTicket;
import com.vapttracker.repository.AuditLogRepository;
import com.vapttracker.repository.VaptTicketRepository;
import com.vapttracker.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    private final VaptTicketRepository ticketRepository;

    public void log(
            Long ticketId,
            String status
    ) {

        AuditLog audit = new AuditLog();
        Optional<VaptTicket> optionalVaptTicket = ticketRepository.findById(ticketId);
        if(optionalVaptTicket.isPresent())
            audit.setTicket(optionalVaptTicket.get());
        else
            audit.setTicket(new VaptTicket());
        audit.setStatus(status);

        audit.setCreatedBy(
                SecurityUtil.getCurrentUserEmail()
        );

        auditLogRepository.save(audit);
    }
}