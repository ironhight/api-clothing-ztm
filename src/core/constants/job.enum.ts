export enum ApplicantStatus {
	NEW = 1,
	REVIEWED = 2,
	APPOINTMENT = 3,
	FAILED = 4,
	PASSED = 5,
}

export function ApplicantStatusTrans(status = 1): string {
	return {
		1: 'new',
		2: 'reviewed',
		3: 'appointment',
		4: 'failed',
		5: 'passed',
	}[status];
}