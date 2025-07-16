
FROM node:22-alpine AS builder
WORKDIR /repo

COPY pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter api build


FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /repo/pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY --from=builder /repo/apps/api/package.json ./apps/api/
RUN corepack enable && pnpm install --prod --filter api...

COPY --from=builder /repo/apps/api/dist ./apps/api/dist

CMD ["node", "apps/api/dist/main.js"]
