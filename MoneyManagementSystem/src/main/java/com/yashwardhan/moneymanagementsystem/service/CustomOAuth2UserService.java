package com.yashwardhan.moneymanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.entity.CustomOAuth2User;
import com.yashwardhan.moneymanagementsystem.repository.AppUserRepo;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private AppUserRepo appUserRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        Object providerIdObj = oAuth2User.getAttribute("id");
        if (providerIdObj == null) {
            providerIdObj = oAuth2User.getAttribute("sub");
        }
        String providerId = String.valueOf(providerIdObj);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String imageUrl = oAuth2User.getAttribute("avatar_url");
        if (imageUrl == null) {
            imageUrl = oAuth2User.getAttribute("picture");
        }

        AppUser user = appUserRepository.findByProviderAndProviderId(provider, providerId)
                .orElseGet(AppUser::new);

        user.setProvider(provider);
        user.setProviderId(providerId);
        user.setEmail(email != null ? email : "not-provided");
        user.setName(name != null ? name : oAuth2User.getAttribute("login"));
        user.setImageUrl(imageUrl);

        appUserRepository.save(user);

        // 👇 return wrapped user instead of raw OAuth2User
        return new CustomOAuth2User(oAuth2User, user);
    }

}
