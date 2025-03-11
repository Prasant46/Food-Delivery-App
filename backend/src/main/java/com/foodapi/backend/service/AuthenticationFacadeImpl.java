package com.foodapi.backend.service;

import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements AutthenticationFacade{
    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
