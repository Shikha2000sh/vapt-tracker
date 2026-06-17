package com.vapttracker.dto;

public class DashboardStatsDto {

    private long openTickets;

    private long inProgressTickets;

    private long closedTickets;

    public DashboardStatsDto(
            long openTickets,
            long inProgressTickets,
            long closedTickets
    ) {
        this.openTickets = openTickets;
        this.inProgressTickets = inProgressTickets;
        this.closedTickets = closedTickets;
    }

    public long getOpenTickets() {
        return openTickets;
    }

    public long getInProgressTickets() {
        return inProgressTickets;
    }

    public long getClosedTickets() {
        return closedTickets;
    }
}