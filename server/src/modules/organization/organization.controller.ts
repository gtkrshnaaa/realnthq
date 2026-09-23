import { Controller, Get } from '@nestjs/common';
import { OrganizationService, OrganizationDetails } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async getOrganization(): Promise<OrganizationDetails> {
    return this.organizationService.getCurrentOrganization();
  }
}
