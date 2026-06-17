package com.vapttracker.service;

import com.vapttracker.entity.Vendor;
import com.vapttracker.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class VendorService {
    @Autowired
    VendorRepository vendorRepository;


    public List<Vendor> getAllTickets() {
        return vendorRepository.findAll();
    }

    public Vendor createVendor(String vendorName) {
        Vendor vendor = new Vendor();
        vendor.setVendorName(vendorName);
        vendorRepository.save(vendor);
        return vendor;
    }
}
