import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  AssignEvaluator,
  Button,
  Link as LinkComponent,
  Comments,
  BroaderReview,
  MenuButton,
  Panel,
  RenderCHFSElement,
  withAuth,
} from '../../components';
import { useApplicationDetails } from '../../services';
import { ApplicationStatus } from '../../constants';
import { WorkshopReview } from '../../components/application/WorkshopReview';
import { formatDate } from 'utils';
import { useAuthContext } from '@contexts';

const ApplicationDetails: NextPage = () => {
  const { query } = useRouter();
  const { user } = useAuthContext();
  const id = query?.id ? +query.id : undefined;

  const {
    applicationType,
    details,
    downloadPDF,
    formData,
    getNextStatusUpdates,
    isPanelDefaultOpen,
    schema,
    setShowComments,
    showComments,
    topStatusObj,
    updateEvaluator,
    userList,
  } = useApplicationDetails(id);

  const applicationStatus: ApplicationStatus = (details?.status?.name ||
    ApplicationStatus.RECEIVED) as ApplicationStatus;

  const renderItemValue = (details: any, title: string, key: string) => {
    const getItemValue = () => {
      if (key === 'status') {
        return details[key].name || '-';
      }

      if (key === 'lastUpdatedBy') {
        return details[key]?.displayName || '-';
      }

      return formatDate(details[key]);
    };

    return (
      <>
        <p className='text-sm text-slate-400'>{title}</p>
        <p className='text-lg'>{getItemValue()}</p>
      </>
    );
  };

  const getColSpan = () => {
    if ([
      ApplicationStatus.WORKSHOP,
      ApplicationStatus.APPROVED,
      ApplicationStatus.DENIED,
    ].includes(applicationStatus)) {
      return showComments ? 'col-span-1' : 'col-span-2';
    }
    return showComments ? 'col-span-2' : 'col-span-3';
  };

  return (
    <>
      {details && id && typeof id === 'number' && (
        <div className='min-h-screen p-5 w-full bg-white'>
          <div className='w-full mt-2'>
            <LinkComponent href='/applications' variant='link'>
              Applications
            </LinkComponent>{' '}
            &gt;&gt; Confirmation ID: {details.confirmationId}
          </div>
          <h1 className='text-3xl w-full text-bcBluePrimary text-left mb-2 mt-2'>
            {details.projectTitle}
          </h1>
          <div className='flex flex-row mb-4 mt-4'>
            <div className='flex flex-none flex-row  w-3/5 gap-2'>
              <div className='w-fit'>
                <AssignEvaluator
                  users={userList}
                  onChange={updateEvaluator}
                  defaultEvaluator={details.assignedTo}
                />
              </div>
              <div className='w-fit'>
                <Button variant='outline' onClick={() => setShowComments(true)}>
                  <FontAwesomeIcon icon={faComment} className='h-4 mr-2 text-bcBluePrimary' />{' '}
                  Comments
                </Button>
              </div>
            </div>
            <div className='w-2/5 justify-end flex'>
              {applicationStatus === ApplicationStatus.WORKSHOP && (
                <div className='gap-2 flex'>
                  <Link href={`/applications/${id}/score-table`}>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`w-auto inline-flex justify-center items-center rounded 
  shadow-sm px-4 py-2 text-base font-bold focus:outline-none
  disabled:opacity-50
  focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:text-sm border-transparent bg-bcBluePrimary text-white hover:bg-blue-800 focus:ring-blue-500`}
                    >
                      View Summary Table
                    </a>
                  </Link>
                  <Button variant='primary' onClick={downloadPDF}>
                    Download As PDF
                  </Button>
                </div>
              )}
              {(applicationStatus !== ApplicationStatus.WORKSHOP || user?.isAdmin) && (
                <MenuButton title='Open' items={getNextStatusUpdates(id, applicationStatus)} />
              )}
            </div>
          </div>

          <div className='grid grid-cols-6 mb-4 mt-4 gap-2'>
            {topStatusObj.map((item: any, index) => {
              return (
                <div
                  key={`statusBox-${index}`}
                  className={`p-2.5 grid grid-rows-2 h-24 ${
                    index == 0 ? ' bg-bcBluePrimary text-white' : ' bg-gray-100'
                  }  items-center text-center justify-center`}
                >
                  {renderItemValue(details, item.title, item.value)}
                </div>
              );
            })}
          </div>

          <div className='grid grid-cols-4 gap-4'>
            <div className={`${getColSpan()} overflow-y-auto h-screen sticky top-5`}>
              {schema?.length > 0 &&
                formData &&
                schema
                  ?.filter(
                    each =>
                      !each.conditional.show ||
                      (each.conditional.show && formData[each.conditional.when] == true),
                  )
                  .map((each, i: number) => (
                    <Panel
                      title={each.title}
                      key={each.key}
                      isOpen={isPanelDefaultOpen(i, applicationStatus, each.title)}
                    >
                      <div className='leading-6 p-6 grid gap-4'>
                        {each.components?.map((eachComp: any, index: number) => (
                          <div key={`cmp-${index}`}>
                            <div className='leading-6 grid lg:grid-cols-2 md:grid-cols-2 gap-4'>
                              <RenderCHFSElement
                                component={eachComp}
                                formData={formData}
                                key={eachComp.id}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  ))}
            </div>
            {details && applicationType && (
              <div className='col-span-1 pb-4'>
                <BroaderReview
                  applicationId={id}
                  applicationType={applicationType}
                  formData={formData}
                  userList={userList}
                />
              </div>
            )}
            {details && applicationType && [
                ApplicationStatus.WORKSHOP,
                ApplicationStatus.APPROVED,
                ApplicationStatus.DENIED,
              ].includes(applicationStatus) && (
              <div className='col-span-1 pb-4'>
                <WorkshopReview
                  applicationId={id}
                  applicationType={applicationType}
                  formData={formData}
                />
              </div>
            )}
            {showComments && id && typeof id === 'number' && (
              <div className='col-span-1 pb-4'>
                <Comments applicationId={id} onClose={() => setShowComments(false)} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(withAuth(ApplicationDetails)), {
  ssr: false,
});
