FROM node:22-alpine AS builder
WORKDIR /repo

COPY pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY apps/worker/package.json ./apps/worker/

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter worker build


FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /repo/pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY --from=builder /repo/apps/worker/package.json ./apps/worker/
RUN corepack enable && pnpm install --prod --filter worker...

COPY --from=builder /repo/apps/worker/dist ./apps/worker/dist

CMD ["node", "apps/worker/dist/main.js"]
