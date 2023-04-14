import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { FundLog } from "../generated/schema"
import { FundLog as FundLogEvent } from "../generated/CrowdFund/CrowdFund"
import { handleFundLog } from "../src/crowd-fund"
import { createFundLogEvent } from "./crowd-fund-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fundID = BigInt.fromI32(234)
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let goal = BigInt.fromI32(234)
    let newFundLogEvent = createFundLogEvent(fundID, receiver, goal)
    handleFundLog(newFundLogEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FundLog created and stored", () => {
    assert.entityCount("FundLog", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FundLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fundID",
      "234"
    )
    assert.fieldEquals(
      "FundLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FundLog",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "goal",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
