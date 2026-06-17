package com.vapttracker.repository;

import com.vapttracker.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByTicketIdOrderByCreatedAtDesc(Long ticketId);
}