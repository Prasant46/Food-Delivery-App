package com.foodapi.backend.service;

import com.foodapi.backend.io.CartRequest;
import com.foodapi.backend.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
