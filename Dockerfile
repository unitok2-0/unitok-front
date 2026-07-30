FROM node:20-bookworm-slim

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

# NEXT_PUBLIC_* vars get inlined into the client bundle at build time, so they
# have to be available as build args, not just runtime env vars.
ARG NEXT_PUBLIC_BASE_URL_BACKEND
ARG NEXT_PUBLIC_RECAPTCHA_KEY
ARG NEXT_PUBLIC_FILES_URL
ENV NEXT_PUBLIC_BASE_URL_BACKEND=$NEXT_PUBLIC_BASE_URL_BACKEND
ENV NEXT_PUBLIC_RECAPTCHA_KEY=$NEXT_PUBLIC_RECAPTCHA_KEY
ENV NEXT_PUBLIC_FILES_URL=$NEXT_PUBLIC_FILES_URL

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
