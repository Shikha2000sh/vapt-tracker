package com.vapttracker.controller;

import com.vapttracker.entity.Vendor;
import com.vapttracker.service.VendorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class VendorController {

    @Autowired
    VendorService vendorService;
    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllTickets();
    }

    @PostMapping
    public Vendor createVendor(@RequestParam String vendorName) {
        return vendorService.createVendor(vendorName);
    }

}
