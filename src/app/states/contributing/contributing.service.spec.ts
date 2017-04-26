import { mock } from "angular";
import { ContributingService } from "./contributing.service";

describe("Contributing Service", () => {
    beforeEach(mock.module("app"));

    let contributingService;
    
    beforeEach(inject((_ContributingService_) => {
        contributingService = _ContributingService_;
    }))
    
   it("Should check login service test method", () => {
        expect(contributingService.testMethod()).toEqual(2);
   })
})