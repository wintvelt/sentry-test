import ApiStack from "./apiStack";

export default function main(app) {
  new ApiStack(app, "api")
}