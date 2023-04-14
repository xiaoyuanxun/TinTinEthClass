import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { FundLog, bid } from "../generated/CrowdFund/CrowdFund"

export function createFundLogEvent(
  fundID: BigInt,
  receiver: Address,
  goal: BigInt
): FundLog {
  let fundLogEvent = changetype<FundLog>(newMockEvent())

  fundLogEvent.parameters = new Array()

  fundLogEvent.parameters.push(
    new ethereum.EventParam("fundID", ethereum.Value.fromUnsignedBigInt(fundID))
  )
  fundLogEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  fundLogEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )

  return fundLogEvent
}

export function createbidEvent(user: Address, fundID: BigInt): bid {
  let bidEvent = changetype<bid>(newMockEvent())

  bidEvent.parameters = new Array()

  bidEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  bidEvent.parameters.push(
    new ethereum.EventParam("fundID", ethereum.Value.fromUnsignedBigInt(fundID))
  )

  return bidEvent
}
