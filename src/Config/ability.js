import { Ability } from '@casl/ability';

export default new Ability([]);
// If we need default permissions, we would create it those way
// import { AbilityBuilder } from '@casl/ability'

// function subjectName(item) {
//   if (!item || typeof item === 'string') {
//     return item
//   }

//   return item.__type
// }

// export default AbilityBuilder.define({ subjectName }, can => {
//   can(['read'], 'Mathematicians-data');
// })



