package com.vapttracker.repository;

import com.vapttracker.dto.SecondaryOwnerReportDTO;
import com.vapttracker.dto.VendorStatsDTO;
import com.vapttracker.entity.VaptTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VaptTicketRepository
        extends JpaRepository<VaptTicket, Long>,
        JpaSpecificationExecutor<VaptTicket> {

        long countByStatus(String status);
        @Query(value = """
                SELECT
                v.vendor_name AS vendorName,
                SUM(
                        CASE
                WHEN t.status = 'OPEN'
                THEN 1
                ELSE 0
                END
        ) AS OPEN,
        SUM(
                CASE
                        WHEN t.status = 'IN_PROGRESS'
                        THEN 1
                        ELSE 0
                        END
        ) AS IN_PROGRESS,
        SUM(
                CASE
                        WHEN t.status = 'CLOSED'
                        THEN 1
                        ELSE 0
                        END
        ) AS CLOSED
        FROM vapt_ticket t
        JOIN vendor v
        ON t.vendor_id = v.id
        GROUP BY v.vendor_name
""", nativeQuery = true)
        List<Object[]> getVendorStats();

        @Query(value = """
        SELECT
        secondary_owner,
        SUM(
            CASE
                WHEN status = 'OPEN'
                THEN 1
                ELSE 0
            END
        ) AS OPEN,
        SUM(
            CASE
                WHEN status = 'IN_PROGRESS'
                THEN 1
                ELSE 0
            END
        ) AS IN_PROGRESS,
        SUM(
            CASE
               WHEN status = 'CLOSED'
                THEN 1
                ELSE 0
            END
        ) AS CLOSED
        FROM vapt_ticket
        WHERE secondary_owner IS NOT NULL
        GROUP BY secondary_owner
        """, nativeQuery = true)

        List<Object[]>  getSecondaryOwnerReport();

        @Query(value = """
        SELECT
        CASE
            WHEN DATEDIFF(NOW(), created_at)
                BETWEEN 0 AND 30
                THEN '0-30 Days'
            WHEN DATEDIFF(NOW(), created_at)
                BETWEEN 31 AND 60
                THEN '31-60 Days'
            WHEN DATEDIFF(NOW(), created_at)
                BETWEEN 61 AND 90
                THEN '61-90 Days'
            ELSE '90+ Days'
        END AS agingBucket,
        COUNT(*) AS ticketCount
        FROM vapt_ticket
        where status in ('OPEN', 'IN_PROGRESS') 
        GROUP BY agingBucket
        ORDER BY MIN(
            DATEDIFF(NOW(), created_at)
        )
        """, nativeQuery = true)

        List<Object[]>
        getTicketAgingReport();
    }