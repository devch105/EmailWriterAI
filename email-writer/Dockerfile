# Use Eclipse Temurin OpenJDK 21 based Alpine image
FROM openjdk:21-jdk-slim


# Set working directory inside the container
WORKDIR /app

# Copy the jar built by Maven into the container
COPY target/*.jar app.jar

# Expose port 8080, default Spring Boot port
EXPOSE 8080

# Run the Spring Boot jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
