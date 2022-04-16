package com.seokjae.chatweb.login;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserVO {
    private String username;
    private String password;

    @Override
    public String toString() {
        return "LoginVO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
