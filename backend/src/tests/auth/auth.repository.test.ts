import authRepository from "../../modules/auth/repositories/auth.repository.js";

async function main() {
  console.log("Repository Loaded");

  console.log(typeof authRepository.findByEmail);

  console.log(typeof authRepository.create);

  console.log(typeof authRepository.updatePassword);

  console.log(typeof authRepository.saveRefreshToken);

  console.log("PASS");
}

main();