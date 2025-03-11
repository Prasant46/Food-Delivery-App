package com.foodapi.backend.service;

import com.foodapi.backend.io.UserRequest;
import com.foodapi.backend.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
