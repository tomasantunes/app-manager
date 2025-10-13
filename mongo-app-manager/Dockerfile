# Use official MongoDB image as base
FROM mongo:8.0

# Copy initialization scripts (optional)
# Any .js or .sh file in /docker-entrypoint-initdb.d/ will be run at startup
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expose default MongoDB port
EXPOSE 27017
