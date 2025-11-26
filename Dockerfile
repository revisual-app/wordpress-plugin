# Base image with PHP & Composer
FROM php:8.2-cli

# Install system dependencies and Node.js + npm
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create app directory
WORKDIR /app

CMD ["sh", "-c", "composer install --no-interaction --prefer-dist && npm install"]
