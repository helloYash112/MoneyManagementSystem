package com.yashwardhan.moneymanagementsystem.entity;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.yashwardhan.moneymanagementsystem.entity.AppUser;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2User oAuth2User;
    private final AppUser appUser;

    public CustomOAuth2User(OAuth2User oAuth2User, AppUser appUser) {
        this.oAuth2User = oAuth2User;
        this.appUser = appUser;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oAuth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return appUser.getName(); // use DB value
    }

    public AppUser getAppUser() {
        return appUser;
    }
}
