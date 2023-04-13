import hre, { ethers } from "hardhat";

async function main() {
  const constructorArguments = ["0x4976A688f130248Fa4AFcf4903440547C63c3288"];
  const Greeter = await ethers.getContractFactory("PaymentGate");
  const greeter = await Greeter.deploy(constructorArguments[0]);

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  await seep(5000);

  await hre.run("verify:verify", {
    address: greeter.address,
    constructorArguments,
  });

  console.log("verified");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function seep(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
