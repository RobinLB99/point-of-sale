package com.robinlugoboero.possystemapi.infraestructure.security;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Configuración maestra de seguridad del sistema POS.
 * Implementa un modelo de seguridad basado en OAuth2 con tokens JWT, utilizando
 * criptografía asimétrica (RSA) para la firma y verificación de tokens.
 * Define dos cadenas de filtros principales para separar el tráfico público del protegido.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final UserDetailsServiceImpl userDetailsService;

  /**
   * Primera Cadena de Seguridad: Acceso Público.
   * Maneja endpoints que no requieren autenticación previa como el login,
   * documentación técnica (Swagger) y consola H2.
   *
   * @param http Configuración de seguridad HTTP.
   * @return SecurityFilterChain configurada para recursos públicos.
   * @throws Exception en caso de errores de configuración.
   */
  @Bean
  @Order(1)
  public SecurityFilterChain publicSecurityFilterChain(HttpSecurity http)
    throws Exception {
    return http
      .securityMatcher(
        "/auth/login",
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html"
      )
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .csrf(AbstractHttpConfigurer::disable)
      .headers(headers -> headers.frameOptions(frame -> frame.disable()))
      .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .build();
  }

  /**
   * Segunda Cadena de Seguridad: API Protegida.
   * Aplica autenticación JWT obligatoria para el resto de la aplicación.
   *
   * @param http Configuración de seguridad HTTP.
   * @return SecurityFilterChain configurada para recursos protegidos.
   * @throws Exception en caso de errores de configuración.
   */
  @Bean
  @Order(2)
  public SecurityFilterChain apiSecurityFilterChain(HttpSecurity http)
    throws Exception {
    return http
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .oauth2ResourceServer(oauth2 ->
        oauth2.jwt(jwt ->
          jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
        )
      )
      .authenticationProvider(authenticationProvider())
      .build();
  }

  /**
   * Configura la extracción de autoridades (roles) desde el token JWT.
   * Mapea el claim 'scope' a autoridades con prefijo 'ROLE_'.
   *
   * @return Convertidor de autenticación JWT.
   */
  @Bean
  public JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
      new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
    grantedAuthoritiesConverter.setAuthoritiesClaimName("scope");

    JwtAuthenticationConverter jwtAuthenticationConverter =
      new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(
      grantedAuthoritiesConverter
    );
    return jwtAuthenticationConverter;
  }

  /**
   * Configuración de CORS (Cross-Origin Resource Sharing).
   * Define los orígenes permitidos (Frontend) y métodos HTTP autorizados.
   *
   * @return Fuente de configuración CORS.
   */
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:4200"));
    configuration.setAllowedMethods(
      List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
    );
    configuration.setAllowedHeaders(
      List.of("Authorization", "Content-Type", "Accept")
    );
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source =
      new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  // --- INFRAESTRUCTURA JWT (RSA) ---

  /**
   * Decodificador de tokens JWT utilizando la llave pública RSA.
   *
   * @param rsaKey Llave RSA configurada.
   * @return JwtDecoder instancia.
   * @throws Exception si hay problemas de conversión.
   */
  @Bean
  public JwtDecoder jwtDecoder(RSAKey rsaKey) throws Exception {
    return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
  }

  /**
   * Codificador de tokens JWT para la generación de nuevos tokens.
   *
   * @param jwkSource Fuente de llaves JWK.
   * @return JwtEncoder instancia.
   */
  @Bean
  public JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
    return new NimbusJwtEncoder(jwkSource);
  }

  /**
   * Fuente de llaves para el codificador.
   *
   * @param rsaKey Llave maestra RSA.
   * @return JWKSource instancia.
   */
  @Bean
  public JWKSource<SecurityContext> jwkSource(RSAKey rsaKey) {
    JWK jwk = rsaKey;
    JWKSet jwkSet = new JWKSet(jwk);
    return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
  }

  /**
   * Construye el objeto RSAKey a partir del par de llaves generado.
   *
   * @param keyPair Par de llaves RSA.
   * @return RSAKey instancia con ID único.
   */
  @Bean
  public RSAKey rsaKey(KeyPair keyPair) {
    return new RSAKey.Builder((RSAPublicKey) keyPair.getPublic())
      .privateKey((RSAPrivateKey) keyPair.getPrivate())
      .keyID(UUID.randomUUID().toString())
      .build();
  }

  /**
   * Generador de pares de llaves RSA de 2048 bits.
   * IMPORTANTE: En producción, estas llaves deben persistirse o cargarse de un almacén seguro.
   *
   * @return KeyPair con llaves pública y privada.
   */
  @Bean
  public KeyPair keyPair() {
    try {
      var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
      keyPairGenerator.initialize(2048);
      return keyPairGenerator.generateKeyPair();
    } catch (Exception e) {
      throw new RuntimeException("Error generando llaves RSA", e);
    }
  }

  // --- AUTH BEANS ---

  /**
   * Proveedor de autenticación basado en base de datos.
   * Vincula nuestro UserDetailsService y el codificador de contraseñas.
   *
   * @return AuthenticationProvider configurado.
   */
  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(
      userDetailsService
    );
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  /**
   * Manager encargado de orquestar los procesos de autenticación.
   *
   * @param config Configuración global de autenticación.
   * @return AuthenticationManager instancia.
   * @throws Exception si no se puede obtener el manager.
   */
  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration config
  ) throws Exception {
    return config.getAuthenticationManager();
  }

  /**
   * Codificador de contraseñas utilizando el algoritmo BCrypt.
   * Utiliza una fuerza de 12 (costo computacional equilibrado).
   *
   * @return PasswordEncoder instancia.
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }
}
