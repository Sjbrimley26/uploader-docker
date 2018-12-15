FROM node:lts-alpine
ADD . /src
WORKDIR /src
EXPOSE 3005
RUN npm i
CMD ["node", "index"]