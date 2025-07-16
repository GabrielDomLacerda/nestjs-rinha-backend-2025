FROM node:22-alpine AS builder
WORKDIR /repo

COPY pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY apps/health-checker/package.json ./apps/health-checker/

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter health-checker build


FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /repo/pnpm-workspace.yaml .npmrc package.json pnpm-lock.yaml ./
COPY --from=builder /repo/apps/health-checker/package.json ./apps/health-checker/
RUN corepack enable && pnpm install --prod --filter health-checker...

COPY --from=builder /repo/apps/health-checker/dist ./apps/health-checker/dist

CMD ["node", "apps/health-checker/dist/main.js"]
