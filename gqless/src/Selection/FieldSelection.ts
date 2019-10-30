import { buildArguments, Formatter } from '../QueryBuilder'

import { FieldNode, Node, Outputable } from '../Node'
import { Selection } from './Selection'

const argsFormatter = new Formatter({ prettify: false, variables: false })

export class FieldSelection<
  TNode extends Node & Outputable = Node & Outputable
> extends Selection<TNode> {
  constructor(
    public field: FieldNode<TNode>,
    public readonly args?: Record<string, any>
  ) {
    super(field.ofNode)
  }

  public toString() {
    const args = this.args
      ? `(${buildArguments(argsFormatter, this.args, {
          node: this.field.args!,
        })})`
      : ''

    return this.field.name + args
  }
}
