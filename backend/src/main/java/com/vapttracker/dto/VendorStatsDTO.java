package com.vapttracker.dto;
public class VendorStatsDTO {

    private String vendorName;

    private Long OPEN;

    private Long IN_PROGRESS;

    private Long CLOSED;

    public VendorStatsDTO(

            String vendorName,

            Long OPEN,

            Long IN_PROGRESS,

            Long CLOSED

    ) {

        this.vendorName = vendorName;

        this.OPEN = OPEN;

        this.IN_PROGRESS = IN_PROGRESS;

        this.CLOSED = CLOSED;
    }

    public String getVendorName() {
        return vendorName;
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