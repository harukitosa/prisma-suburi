// api/graphql/Post.ts
import { extendType, objectType } from 'nexus'
import { NewUserRepository } from '../../script'
export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')          
    t.string('email')   
    t.string('name') 
  },
})


export const UserQuery = extendType({
	type: 'Query',
	
	definition(t) {
		t.nonNull.list.field('Users', {    
			type: 'User', 
			async resolve() {
				const repo = NewUserRepository();
				const users = await repo.getAll();
				const data = users.map((user) => {
					return {
						id: user.getId(),
						name: user.getName(),
						email: user.getEmail()
					}
				})
				return data
			}, 
		})
	},
	
})