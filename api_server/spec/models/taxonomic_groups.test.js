const {TaxononmicGroups} = require('../../built/models/taxonomic_groups')
// import {TaxonomicGroups} from '../../built/models/taxonomic_groups'

fdescribe('TaxonomicGroups', () => {
  describe('create', () => {
    test('it has the correct arguments', async () => {
      const group = await TaxononmicGroups.create({})
    })
  })
})