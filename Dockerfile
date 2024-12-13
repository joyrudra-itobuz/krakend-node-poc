FROM node:20-alpine3.19

WORKDIR /app

COPY . .

RUN corepack enable

CMD ["sh", "-c", "yarn && yarn dev && yarn build:krakend && cd krakend && tail -f /dev/null"]


# FROM node:20-alpine3.19

# WORKDIR /app

# COPY . .

# RUN corepack enable

# # Add debugging step
# RUN ls -alh /app

# CMD ["sh", "-c", "yarn && yarn dev && yarn build:krakend && cd krakend && tail -f /dev/null"]
