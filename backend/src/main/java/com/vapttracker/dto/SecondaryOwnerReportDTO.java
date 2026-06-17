package com.vapttracker.dto;

public class SecondaryOwnerReportDTO {

    private String secondaryOwner;

    private Long OPEN;

    private Long IN_PROGRESS;

    private Long CLOSED;

    public SecondaryOwnerReportDTO(

            String secondaryOwner,

            Long OPEN,

            Long IN_PROGRESS,

            Long CLOSED

    ) {

        this.secondaryOwner =
                secondaryOwner;

        this.OPEN = OPEN;

        this.IN_PROGRESS = IN_PROGRESS;

        this.CLOSED = CLOSED;
    }

    public String getSecondaryOwner() {
        return secondaryOwner;
    }

    public Long getOPEN() {
        return OPEN;
    }

    public Long getIN_PROGRESS() {
        return IN_PROGRESS;
    }

    public Long getCLOSED() {
        return CLOSED;
    }
}