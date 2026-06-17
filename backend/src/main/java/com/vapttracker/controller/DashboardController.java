package com.vapttracker.controller;

import com.vapttracker.dto.DashboardStatsDto;
import com.vapttracker.dto.SecondaryOwnerReportDTO;
import com.vapttracker.dto.TicketAgingReportsDTO;
import com.vapttracker.dto.VendorStatsDTO;
import com.vapttracker.repository.VaptTicketRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class DashboardController {

    private final VaptTicketRepository
            ticketRepository;

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {
        long open =
                ticketRepository.countByStatus(
                        "OPEN"
                );
        long progress =
                ticketRepository.countByStatus(
                        "IN_PROGRESS"
                );
        long closed =
                ticketRepository.countByStatus(
                        "CLOSED"
                );
        return new DashboardStatsDto(
                open,
                progress,
                closed
        );
    }

    @GetMapping("/vendors")
    public List<VendorStatsDTO>
    getVendorReport() {
        List<Object[]> results =
                ticketRepository
                        .getVendorStats();
        return results.stream()
                .map((Object[] row) ->
                        new VendorStatsDTO(
                                (String) row[0],
                                ((Number) row[1]).longValue(),
                                ((Number) row[2]).longValue(),
                                ((Number) row[3]).longValue()
                        )
                )
                .collect(Collectors.toList());
    }

    @GetMapping("/secondary-owner-report")
    public List<SecondaryOwnerReportDTO>
    getSecondaryOwnerReport() {
        List<Object[]> results =
                ticketRepository
                        .getSecondaryOwnerReport();

        return results.stream()
                .map((Object[] row) ->
                        new SecondaryOwnerReportDTO(
                                (String) row[0],
                                ((Number) row[1]).longValue(),
                                ((Number) row[2]).longValue(),
                                ((Number) row[3]).longValue()
                        )
                )
                .toList();
    }

    @GetMapping("/aging-report")
    public List<TicketAgingReportsDTO>
    getAgingReport() {
        List<Object[]> results =
                ticketRepository
                        .getTicketAgingReport();
        return results.stream()
                .map(row ->
                        new TicketAgingReportsDTO(
                                (String) row[0],
                                ((Number) row[1]).longValue()
                        )
                )
                .toList();
    }
}