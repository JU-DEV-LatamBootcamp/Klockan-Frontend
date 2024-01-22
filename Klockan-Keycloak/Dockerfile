# Use the official Keycloak image as the base image
FROM quay.io/keycloak/keycloak:23.0.4

# Set environment variables for Keycloak admin user
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Expose the default Keycloak port
EXPOSE 8080

# Start Keycloak in development mode
CMD ["start-dev"]