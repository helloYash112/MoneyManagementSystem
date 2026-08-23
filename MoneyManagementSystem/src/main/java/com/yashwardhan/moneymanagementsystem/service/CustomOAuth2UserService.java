package com.yashwardhan.moneymanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.yashwardhan.moneymanagementsystem.entity.AppUser;
import com.yashwardhan.moneymanagementsystem.repository.AppUserRepo;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private AppUserRepo appUserRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase(); // "GITHUB" or "GOOGLE"

        // Safely handle providerId
        Object providerIdObj = oAuth2User.getAttribute("id"); // GitHub
        if (providerIdObj == null) {
            providerIdObj = oAuth2User.getAttribute("sub"); // Google
        }
        String providerId = String.valueOf(providerIdObj); // works for Integer or String

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String imageUrl = oAuth2User.getAttribute("avatar_url"); // GitHub
        if (imageUrl == null) {
            imageUrl = oAuth2User.getAttribute("picture"); // Google
        }

        // Find existing user or create new
        AppUser user = appUserRepository.findByProviderAndProviderId(provider, providerId)
                .orElseGet(AppUser::new);

        user.setProvider(provider);
        user.setProviderId(providerId);
        user.setEmail(email != null ? email : "not-provided");
        user.setName(name != null ? name : oAuth2User.getAttribute("login")); // fallback for GitHub
        user.setImageUrl(imageUrl);

        appUserRepository.save(user);

        return oAuth2User; // still return OAuth2User for Spring Security context
    }
}
