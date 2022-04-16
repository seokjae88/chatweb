package com.seokjae.chatweb.login;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody UserVO user){
        System.out.println("login!!");
        System.out.println(user.toString());

        if (loginService.login(user)) {
            System.out.println("success!!");
            return new ResponseEntity("", HttpStatus.OK);
        }
        System.out.println("fail!!");
        return new ResponseEntity("Wrong Password!!", HttpStatus.UNAUTHORIZED);
    }
}
