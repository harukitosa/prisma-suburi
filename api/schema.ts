import { makeSchema } from "nexus";
import { join } from "path/posix";
import * as types from './graphql'

export const schema = makeSchema({
	types,
	outputs: {
		typegen: join(__dirname, ',,', 'nexus-typegen.ts'),
		schema: join(__dirname, '..', 'schema.graphpl'),
	}
})
