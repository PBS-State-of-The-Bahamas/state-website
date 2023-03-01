import getLifeMembers from "@/api/modules/lifeMember/getLifeMembers";
import getLifeMembersPageContent from "@/api/modules/lifeMember/getLifeMembersPageContent";
import LineMember, { LineMemberProps } from "@/components/lineage/line_member";
import Member from "@/components/member/member";
import PageTemplate from "@/components/PageTemplate";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { v4 } from "uuid";

export default function LifeMembers({
  lifeMembers,
  opening_paragraph
}: {
  lifeMembers: LifeMembers;
  opening_paragraph: string
}) {
  const notFound =  <div>Life Members Not Found ...</div>;

  if (!lifeMembers){
    return notFound
  }

  Object.entries(lifeMembers).forEach(([key, value]) => {
    if (!value.length) {
      return notFound
    }
  });

  return (
    <div>
      <Head>
        <title>Life Members</title>
      </Head>
      <PageTemplate>
        <div className="min-h-screen">
          <div className="text-heading-3 pt-12">Sigma Bahamas Life Members</div>
          <div className="pt-2 pb-6">
                {opening_paragraph}
          </div>
          {Object.keys(lifeMembers).map((year) => {
            return (
              <div className="pt-2" key={v4()}>
                <div className="text-heading-4">{year}</div>
                <div className="mt-4 grid md:grid-cols-4 md:gap-4 gap-y-4">
                  {lifeMembers[year].map((lifeMember: LifeMember) => {
                    return (
                      <Member
                        key={lifeMember.id}
                        memberName={lifeMember.memberName}
                        memberPhotoUrl={lifeMember.memberPhotoUrl}
                      >
                        <LineMember
                          key={lifeMember.description.id}
                          id={lifeMember.description.id}
                          lineNumber={lifeMember.description.lineNumber}
                          lineName={lifeMember.description.lineName}
                        />
                      </Member>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </PageTemplate>
    </div>
  );
}

export interface LifeMembers {
  [year: string]: LifeMember[];
}

export interface LifeMember {
  id: number;
  memberName: string;
  memberPhotoUrl: string;
  lifeMembershipYear: number;
  description: LineMemberProps;
}

export const getServerSideProps: GetServerSideProps<{
  lifeMembers: LifeMembers;
  opening_paragraph: string;
}> = async () => {
  const [lifeMembers,opening_paragraph] = await Promise.all([_getLifeMembers(),getPageContent()]);
  return { props: { lifeMembers, opening_paragraph} };
};

async function _getLifeMembers(): Promise<LifeMembers> {
  let lifeMembers: LifeMembers = {};

  const [jsonLifeMembers, error] = await getLifeMembers();

  if (error) {
    console.log(error);
    return jsonLifeMembers;
  }

  jsonLifeMembers?.data?.data?.map((lifeMember) => {
    let lm: LifeMember = {
      id: lifeMember?.id,
      memberName: lifeMember?.attributes?.name,
      memberPhotoUrl: lifeMember?.attributes?.photo?.data?.length
        ? `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}${lifeMember?.attributes?.photo?.data[0].attributes?.formats?.small?.url}`
        : "/images/missing-member.svg",
      lifeMembershipYear: lifeMember?.attributes?.life_membership_year,
      description: {
        id: v4(),
        lineNumber:
          lifeMember?.attributes?.line_member?.data !== null
            ? lifeMember?.attributes?.line_member?.data?.attributes?.line_number
            : null,
        lineName:
          lifeMember?.attributes?.line_member?.data !== null
            ? lifeMember?.attributes?.line_member?.data?.attributes?.line_name
            : null,
      },
    };

    if (lm.lifeMembershipYear in lifeMembers) {
      lifeMembers[lm.lifeMembershipYear].push(lm);
    } else {
      lifeMembers[lm.lifeMembershipYear] = [lm];
    }
  });

  return lifeMembers;
}

async function getPageContent(): Promise<any>{
  const [content, error] = await getLifeMembersPageContent();

  if (error) {
    console.log(error);
    return content;
  }

  return content?.data?.data?.attributes?.opening_paragraph
}
