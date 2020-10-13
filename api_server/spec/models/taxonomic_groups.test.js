const TaxononmicGroups = require('../../built/models/taxonomic_groups')

fdescribe('TaxonomicGroups', () => {
  describe('create', () => {
    test('it has the correct arguments', async () => {
      const group = await TaxononmicGroups.TaxonomicGroups.create({})
    })
  })
})