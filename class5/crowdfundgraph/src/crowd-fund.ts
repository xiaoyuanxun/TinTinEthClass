import {
  FundLog as FundLogEvent,
  bid as bidEvent
} from "../generated/CrowdFund/CrowdFund"
import { FundLog, bid } from "../generated/schema"

export function handleFundLog(event: FundLogEvent): void {
  let entity = new FundLog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fundID = event.params.fundID
  entity.receiver = event.params.receiver
  entity.goal = event.params.goal

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlebid(event: bidEvent): void {
  let entity = new bid(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.user = event.params.user
  entity.fundID = event.params.fundID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
