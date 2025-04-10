"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import Dropdown from "@/components/common/Dropdown";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DateTimeAndEndTimePicker from "@/components/modals/create-gathering-modal/DateTimeAndEndTimePicker";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/Button";
import ImageUploader from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import ServiceSelector from "@/components/ui/ServiceSelector";
import { GATHERING_FORM, SERVICE_LIST } from "@/constants/gathering";
import { useCreateGathering } from "@/hooks/gathering/useCreateGathering";
import { useModal } from "@/hooks/useModal";
import {
  CreateGatheringFormSchema,
  CreateGatheringFormType,
} from "@/schemas/gatheringSchema";
import { createFormDataFromObject } from "@/utils/form";

import AlertModal from "../confirm-alert-modal/AlertModal";

const labelTitleStyle = "text-base font-semibold text-gray-800";
const errorMsgStyle = "text-sm font-semibold text-red-600";

interface ICreateGatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGatheringModal = ({
  isOpen,
  onClose,
}: ICreateGatheringModalProps) => {
  const {
    onOpen: onOpenAlert,
    isOpen: isAlertOpen,
    onClose: onCloseAlert,
  } = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: GATHERING_FORM,
    resolver: zodResolver(CreateGatheringFormSchema),
  });

  const location = useWatch({
    control,
    name: "location",
    defaultValue: GATHERING_FORM.location,
  });

  const { handleCreateGathering, isPending, isError, isSuccess } =
    useCreateGathering();

  const onSubmit = (data: CreateGatheringFormType) => {
    const formData = createFormDataFromObject(data);
    handleCreateGathering(formData);

    if (isSuccess) {
      onClose();
    }

    if (isError) {
      onOpenAlert();
    }
  };

  return (
    <>
      <Modal
        variant="mobileFull"
        isOpen={isOpen}
        onClose={onClose}
        title="모임 만들기"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-10"
        >
          <div className="relative flex flex-col gap-4">
            <Input
              label="모임 이름"
              type="text"
              id="gathering-name"
              placeholder="모임 이름을 입력해주세요."
              {...register("name")}
              errorMsg={errors.name?.message}
            />

            <section className="flex flex-col gap-2">
              <Label className={labelTitleStyle}>선택 서비스</Label>
              <ServiceSelector
                setTypeValue={value =>
                  setValue("type", value, { shouldValidate: true })
                }
                setLocationValue={value =>
                  setValue("location", value, { shouldValidate: true })
                }
              />
              {errors.type && (
                <p role="alert" className={errorMsgStyle}>
                  {errors.type.message}
                </p>
              )}
            </section>
            {location !== SERVICE_LIST.ONLINE.location && (
              <section className="flex flex-col gap-2">
                <Label className={labelTitleStyle}>장소</Label>
                <Dropdown
                  type="form"
                  placeholder="장소를 선택해주세요."
                  onSelect={value =>
                    setValue("location", value, { shouldValidate: true })
                  }
                />
                {errors.location && (
                  <p role="alert" className={errorMsgStyle}>
                    {errors.location.message}
                  </p>
                )}
              </section>
            )}
            <section className="flex flex-col gap-2">
              <Label className={labelTitleStyle}>이미지</Label>
              <ImageUploader
                setValue={value =>
                  setValue("image", value, { shouldValidate: true })
                }
              />
              {errors.image && (
                <p role="alert" className={errorMsgStyle}>
                  {errors.image.message}
                </p>
              )}
            </section>

            <DateTimeAndEndTimePicker
              setDateTimeValue={value =>
                setValue("dateTime", value, { shouldValidate: true })
              }
              setRegistrationEndValue={value =>
                setValue("registrationEnd", value, { shouldValidate: true })
              }
              dateTimeValue={getValues("dateTime")}
              registrationEndValue={getValues("registrationEnd")}
            />
            {(errors.dateTime || errors.registrationEnd) && (
              <p role="alert" className={errorMsgStyle}>
                {errors?.dateTime?.message || errors?.registrationEnd?.message}
              </p>
            )}
            <section>
              <Input
                type="number"
                id="gathering-capacity"
                label="모임 정원"
                placeholder="모임 정원을 입력해주세요. (5~20)"
                {...register("capacity", { valueAsNumber: true })}
                errorMsg={errors.capacity?.message}
              />
            </section>
          </div>
          <Button
            variant="purple"
            className="w-full"
            type="submit"
            disabled={!isValid}
          >
            {isPending ? <LoadingSpinner size="xs" /> : "확인"}
          </Button>
        </form>
      </Modal>

      {isAlertOpen && (
        <AlertModal
          isOpen={isAlertOpen}
          onClose={onCloseAlert}
          title={`모임 생성에 실패했습니다.\n잠시 후 다시 시도해주세요.`}
        />
      )}
    </>
  );
};

export default CreateGatheringModal;
