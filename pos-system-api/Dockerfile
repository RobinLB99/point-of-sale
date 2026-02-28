# Stage 1: Construcción
FROM maven:3.9-eclipse-temurin-25-noble AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Despliegue
FROM eclipse-temurin:25-jre-noble
WORKDIR /app
COPY --from=build /app/target/possystemapi-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
