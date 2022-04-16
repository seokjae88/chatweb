package com.seokjae.chatweb.login;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
//    @Autowired
//    private final UserRepository userRepository;
    private final String PASSWORD = "seokjae";

    public boolean login(UserVO user) {
//        repository는 회원가입 페이지 생성시 추가..
//        User findUser = userRepository.findByUserId(user.getUserId());
//        if(findUser == null){
//            return false;
//        }

        if(!PASSWORD.equals(user.getPassword())){
            return false;
        }
        return true;

    }
}
