FROM node:lts-alpine
ADD . /src
WORKDIR /src
RUN npm i
EXPOSE 4000
CMD ["node", "app"]