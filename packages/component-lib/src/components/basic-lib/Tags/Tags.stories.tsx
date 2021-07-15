import { Meta, Story } from '@storybook/react/types-6-0'

import { Box, Grid } from '@material-ui/core'
import { ButtonProps } from './Interface';
import { WithTranslation, withTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { NewTagIcon } from './index';

const Styled = styled.div`
  background: ${({theme}) => theme.colorBase.background().bg};
  color: #fff;
`


export const Tags: Story<ButtonProps> = withTranslation()(({}: WithTranslation & any) => {


    return <>
        <Styled>
            {/*<MemoryRouter initialEntries={['/']}>*/}
            <h4>Tags</h4>
            <Box>
                <Grid container spacing={2} alignContent={'center'} justifyContent={'flex-start'} flexWrap={'nowrap'}>
                    <Grid item xs={6} margin={2}>
                        <NewTagIcon/>
                    </Grid>
                </Grid>

            </Box>

        </Styled>
        {/*</MemoryRouter>*/}
    </>
}) as Story<ButtonProps>;

//export const Button = Template.bind({});

export default {
    title: 'resource/Tags',
    component: Tags,
    argTypes: {},
} as Meta
// LButton.args = {}
