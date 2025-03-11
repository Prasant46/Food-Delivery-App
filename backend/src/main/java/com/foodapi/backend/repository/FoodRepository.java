package com.foodapi.backend.repository;

import com.foodapi.backend.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepository extends MongoRepository<FoodEntity,String> {
}
