package com.vapttracker.dto;

public class TicketAgingReportsDTO {

    private String agingBucket;

    private Long ticketCount;

    public TicketAgingReportsDTO(

            String agingBucket,

            Long ticketCount

    ) {

        this.agingBucket =
                agingBucket;

        this.ticketCount =
                ticketCount;
    }

    public String getAgingBucket() {

        return agingBucket;
    }

    public Long getTicketCount() {

        return ticketCount;
    }
}
