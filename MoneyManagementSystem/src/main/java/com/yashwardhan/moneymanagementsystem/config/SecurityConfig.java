package com.yashwardhan.moneymanagementsystem.config;


import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import org.springframework.http.HttpStatus;


import org.springframework.security.web.authentication.HttpStatusEntryPoint;


import com.yashwardhan.moneymanagementsystem.service.CustomOAuth2UserService;

@Configuration
public class SecurityConfig {

    @Value("${frontend.url}")
    private String frontendUrl;


    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            CustomOAuth2UserService customOAuth2UserService,
            AuthenticationSuccessHandler successHandler
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            .exceptionHandling(exception -> exception
            	    .defaultAuthenticationEntryPointFor(
            	        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
            	        request -> request.getRequestURI().startsWith("/api/")
            	    )
            	)

            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/",
                    "/public/**",
                    "/oauth2/**",
                    "/login/**"
                ).permitAll()

                .requestMatchers("/api/users/me").authenticated()

                .anyRequest().authenticated()
            )

            .oauth2Login(oauth -> oauth
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
                .successHandler(successHandler)
            );

        return http.build();
    }


    @Bean
    public AuthenticationSuccessHandler successHandler() {

        SimpleUrlAuthenticationSuccessHandler handler =
                new SimpleUrlAuthenticationSuccessHandler();

        handler.setDefaultTargetUrl(frontendUrl);

        handler.setAlwaysUseDefaultTargetUrl(true);

        return handler;
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(frontendUrl)
        );

        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}